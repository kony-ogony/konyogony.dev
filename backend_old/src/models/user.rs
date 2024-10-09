use crate::db::DB;
use serde::{Deserialize, Serialize};
use surrealdb::engine::local::Db as LocalDb;
use surrealdb::{Error, Surreal};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct User {
    pub access_token: String,
    pub login: String,
    pub _id: String,
    pub last_active: u64,
    pub avatar_url: String,
    pub url: String,
    pub html_url: String,
    pub followers_url: String,
    pub organizations_url: String,
    pub repos_url: String,
    pub name: String,
    pub location: String,
    pub email: String,
    pub bio: String,
    pub public_repos: u64,
    pub followers: u64,
    pub following: u64,
    pub created_at: String,
    pub updated_at: String,
}

impl Default for User {
    fn default() -> Self {
        User {
            access_token: String::new(),
            login: String::new(),
            _id: String::new(),
            last_active: 0,
            avatar_url: String::new(),
            url: String::new(),
            html_url: String::new(),
            followers_url: String::new(),
            organizations_url: String::new(),
            repos_url: String::new(),
            name: String::new(),
            location: String::new(),
            email: String::new(),
            bio: String::new(),
            public_repos: 0,
            followers: 0,
            following: 0,
            created_at: String::new(),
            updated_at: String::new(),
        }
    }
}

#[derive(Clone, Debug)]
pub struct UserRepository {
    pub table: String,
    pub db: Surreal<LocalDb>,
}

impl UserRepository {
    pub async fn new() -> Self {
        let db = DB.get().expect("Database not initialized").clone();
        UserRepository {
            table: "users".to_string(),
            db,
        }
    }

    pub async fn get_all(&self) -> surrealdb::Result<Vec<User>> {
        let res: Vec<User> = self.db.select(&self.table).await?;
        Ok(res)
    }

    pub async fn does_exist(&self, id: &str) -> Result<bool, String> {
        match self.get_by_id(&id.to_string()).await {
            Ok(Some(_)) => Ok(true),
            Ok(None) => Ok(false),
            Err(e) => Err(format!("Error checking if user exists: {}", e)),
        }
    }

    pub async fn get_by_id(&self, id: &String) -> Result<Option<User>, String> {
        let res: Result<Option<User>, Error> = self.db.select((&self.table, id.to_string())).await;
        match res {
            Ok(Some(user)) => Ok(Some(user)),
            Ok(None) => Ok(None),
            Err(err) => Err(err.to_string()),
        }
    }

    pub async fn create(&self, user: User) -> surrealdb::Result<Vec<User>> {
        let res: Vec<User> = self.db.create(&self.table).content(&user).await?;
        Ok(res)
    }

    pub async fn update_user(&self, id: String, user: User) -> surrealdb::Result<User> {
        let res = self
            .db
            .update((&self.table, id.to_string()))
            .content(&user)
            .await?;
        match res {
            Some(user) => Ok(user),
            None => Ok(user),
        }
    }

    // pub async fn delete(&self, id: String) -> surrealdb::Result<User> {
    //     let res = self.db.delete((&self.table, id.to_string())).await?;
    //     match res {
    //         Some(user) => Ok(user),
    //         None => Ok(User::default()),
    //     }
    // }
}
