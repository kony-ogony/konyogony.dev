use actix_cors::Cors;
use actix_web::{web, App, HttpServer};
use dotenv::dotenv;
use env_logger;
use openssl::ssl::{SslAcceptor, SslFiletype, SslMethod};

mod db;
mod models;
mod routes;

use routes::github::get_access_token;
use routes::github::get_user_data;
use routes::user::create_or_update_user;
use routes::user::fetch_all_users;
use routes::user::get_user_by_id;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init();

    db::init().await.expect("Failed to initialize the database");

    let user_repo = web::Data::new(models::user::UserRepository::new().await);

    let mut builder = SslAcceptor::mozilla_intermediate(SslMethod::tls()).unwrap();
    builder
        .set_private_key_file(
            "/home/kony/Documents/GitHub/konyogony.dev/backend/localhost-key.pem",
            SslFiletype::PEM,
        )
        .unwrap();
    builder
        .set_certificate_chain_file(
            "/home/kony/Documents/GitHub/konyogony.dev/backend/localhost.pem",
        )
        .unwrap();
    // This obviously will be changed
    HttpServer::new(move || {
        App::new()
            .app_data(user_repo.clone())
            .wrap(
                Cors::default()
                    .allowed_origin("https://localhost")
                    .allowed_origin("http://localhost:5000")
                    .allowed_origin("https://github.com")
                    .allowed_methods(vec!["GET", "POST"])
                    .allowed_headers(vec![
                        actix_web::http::header::CONTENT_TYPE,
                        actix_web::http::header::COOKIE,
                        actix_web::http::header::AUTHORIZATION,
                    ])
                    .supports_credentials()
                    .max_age(3600),
            )
            .service(get_access_token)
            .service(get_user_data)
            .service(get_user_by_id)
            .service(fetch_all_users)
            .service(create_or_update_user)
    })
    .bind_openssl("localhost:5001", builder)?
    .run()
    .await
}
