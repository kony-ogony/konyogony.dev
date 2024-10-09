use actix_web::{get, post, web, HttpResponse, Responder};
use chrono::{Duration, Utc};
use jsonwebtoken::{
    decode, encode, errors::ErrorKind, Algorithm, DecodingKey, EncodingKey, Header, Validation,
};
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::env;

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    iat: usize,
    exp: usize,
}

impl Claims {
    fn new(user_id: &str, exp_duration: Duration) -> Self {
        let now = Utc::now();
        let exp = now + exp_duration;

        Claims {
            sub: user_id.to_string(),
            iat: now.timestamp() as usize,
            exp: exp.timestamp() as usize,
        }
    }
}

#[derive(Deserialize, Serialize)]
struct GenerateProps {
    id: String,
}

#[get("/generate-jwt")]
pub async fn generate_jwt(query: web::Query<GenerateProps>) -> impl Responder {
    let key = match env::var("ENCRYPTION_KEY") {
        Ok(val) => val,
        Err(_) => return HttpResponse::InternalServerError().json("ENCRYPTION_KEY not set"),
    };

    let claims = Claims::new(&query.id, Duration::hours(12));
    let header = Header::new(Algorithm::HS256);

    match encode(&header, &claims, &EncodingKey::from_secret(key.as_ref())) {
        Ok(jwt) => HttpResponse::Ok().json(jwt),
        Err(_) => HttpResponse::InternalServerError().json("Failed to generate token"),
    }
}

#[derive(Deserialize, Serialize)]
struct ValidateProps {
    token: String,
}

#[post("/validate-jwt")]
pub async fn validate_jwt(body: web::Json<ValidateProps>) -> impl Responder {
    let key = match env::var("ENCRYPTION_KEY") {
        Ok(val) => val,
        Err(_) => return HttpResponse::InternalServerError().json("ENCRYPTION_KEY not set"),
    };

    let token = body.token.trim().to_string();

    match decode::<Claims>(
        &token,
        &DecodingKey::from_secret(key.as_ref()),
        &Validation::new(Algorithm::HS256),
    ) {
        Ok(token_data) => {
            HttpResponse::Ok().json(json!({"status": "valid", "claims": token_data.claims}))
        }
        Err(err) => match err.kind() {
            ErrorKind::ExpiredSignature => HttpResponse::Unauthorized().json("Token has expired"),
            _ => HttpResponse::Ok().json(json!({"status": "invalid", "error": err.to_string()})),
        },
    }
}
