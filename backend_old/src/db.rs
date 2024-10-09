use surrealdb::engine::local::{Db, RocksDb};
use surrealdb::Surreal;
use tokio::sync::OnceCell;

pub static DB: OnceCell<Surreal<Db>> = OnceCell::const_new();

pub async fn init() -> Result<Surreal<Db>, String> {
    let db = Surreal::new::<RocksDb>("surrealdb.db")
        .await
        .map_err(|e| format!("Failed to create database: {}", e))?;

    db.use_ns("dev")
        .use_db("main")
        .await
        .map_err(|e| format!("Failed to switch to namespace: {}", e))?;

    DB.set(db.clone()).unwrap();

    Ok(db)
}
