package database

import (
	 "time"
	models "github.com/sebastiankul-99/ToDo-App/Models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {

	time.Sleep(4 * time.Second)
	
	connection, err := gorm.Open(mysql.Open("root:secretadmin@tcp(mysql-db-todo:3306)/todo_appdb?charset=utf8mb4&parseTime=True&loc=Local"), &gorm.Config{})
	if err != nil {
		panic("Couldnt connect to database")
	}
	DB = connection
	connection.AutoMigrate(&models.User{})
	connection.AutoMigrate(&models.Tasks{})
}
