import * as SQLite from 'expo-sqlite'

const database = SQLite.openDatabaseSync('places.db')

export function init(){
    const promise = new Promise((resolve,reject)=>{
        database.withExclusiveTransactionAsync((tx)=>{
            tx.execSync(`CREATE TABLE IF NOT EXISTS places(
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL
                )`,
                [],
                ()=>{
                    resolve();
                },
                (_,error)=>{
                    reject(error);
                }
            )
        })
    
    });
    return Promise; 
}