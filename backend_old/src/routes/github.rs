use std::env;

use actix_web::{get, web, HttpResponse, Responder};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Deserialize)]
pub struct OAuthRequest {
    code: String,
}

#[derive(Serialize, Deserialize)]
pub struct AccessTokenResponse {
    access_token: String,
    token_type: String,
    scope: Option<String>,
}

#[derive(Deserialize)]
pub struct UserDataRequest {
    access_token: String,
}

#[get("/get-access-token")]
pub async fn get_access_token(oauth_request: web::Query<OAuthRequest>) -> impl Responder {
    let client = Client::new();
    let github_client_id = env::var("GITHUB_CLIENT_ID").expect("GITHUB_CLIENT_ID not set");
    let github_client_secret =
        env::var("GITHUB_CLIENT_SECRET").expect("GITHUB_CLIENT_SECRET not set");

    let code = &oauth_request.code;

    let params = [
        ("client_id", &github_client_id),
        ("client_secret", &github_client_secret),
        ("code", &code),
    ];

    let response = client
        .post("https://github.com/login/oauth/access_token")
        .header("Accept", "application/json")
        .header("Content-Type", "application/x-www-form-urlencoded")
        .form(&params)
        .send()
        .await;

    match response {
        Ok(response) => {
            if response.status().is_success() {
                HttpResponse::Ok().body(response.text().await.unwrap_or_default())
            } else {
                HttpResponse::BadRequest().body(format!("GitHub API error: {}", response.status()))
            }
        }
        Err(e) => HttpResponse::BadRequest().body(format!("Failed to get access token: {}", e)),
    }
}

#[get("/get-user-data")]
pub async fn get_user_data(access_token: web::Query<UserDataRequest>) -> impl Responder {
    let client = Client::new();
    let response = client
        .get("https://api.github.com/user")
        .header(
            "Authorization",
            format!("Bearer {}", access_token.access_token),
        )
        .header("User-Agent", "Actix-Web")
        .send()
        .await
        .map_err(|e| format!("Request error: {}", e));

    match response {
        Ok(response) => {
            if response.status().is_success() {
                HttpResponse::Ok().body(response.text().await.unwrap_or_default())
            } else {
                HttpResponse::BadRequest().body(format!("GitHub API error: {}", response.status()))
            }
        }
        Err(e) => HttpResponse::BadRequest()
            .json(json!({ "error": format!("Failed to get access token: {}", e) })),
    }
}
