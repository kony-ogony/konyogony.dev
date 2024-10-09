use crate::models::user::{User, UserRepository};
use actix_web::{get, post, web, HttpResponse, Responder};

#[post("/get-user-by-id/{id}")]
pub async fn get_user_by_id(
    id: web::Path<String>,
    user_repo: web::Data<UserRepository>,
) -> impl Responder {
    let res = user_repo.get_by_id(&id).await;
    match res {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(e) => HttpResponse::InternalServerError().body(format!("Failed to get user: {}", e)),
    }
}

#[get("/fetch-all-users")]
pub async fn fetch_all_users(user_repo: web::Data<UserRepository>) -> impl Responder {
    match user_repo.get_all().await {
        Ok(users) => HttpResponse::Ok().json(users),
        Err(e) => {
            eprintln!("Error fetching users: {}", e); // Log the error
            HttpResponse::InternalServerError().body(format!("Failed to get users: {}", e))
        }
    }
}

#[post("/create-or-update-user")]
pub async fn create_or_update_user(
    user: web::Json<User>,
    user_repo: web::Data<UserRepository>,
) -> impl Responder {
    let user = user.into_inner();
    let user_clone = user.clone();
    let userid = user._id.clone();
    match user_repo.does_exist(&userid).await {
        Ok(true) => match user_repo.update_user(userid, user_clone).await {
            Ok(updated_user) => HttpResponse::Ok().json(updated_user),
            Err(e) => {
                eprintln!("Error updating user: {}", e);
                HttpResponse::InternalServerError().body(format!("Failed to update user: {}", e))
            }
        },
        Ok(false) => match user_repo.create(user).await {
            Ok(users) => HttpResponse::Ok().json(users[0].clone()),
            Err(e) => {
                eprintln!("Error creating user: {}", e);
                HttpResponse::InternalServerError().body(format!("Failed to create user: {}", e))
            }
        },
        Err(e) => {
            eprintln!("Error checking if user exists: {}", e);
            HttpResponse::InternalServerError().body(format!("Failed to get user: {}", e))
        }
    }
}
