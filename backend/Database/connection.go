package database

import (
	models "github.com/sebastiankul-99/ToDo-App/Models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	username := "root"
	password := "seba123321"
	database := "todo_app"
	connection, err := gorm.Open(mysql.Open(username+":"+password+"@/"+database), &gorm.Config{})
	if err != nil {
		panic("Couldnt connect to database")
	}
	DB = connection
	connection.AutoMigrate(&models.User{})
	connection.AutoMigrate(&models.Tasks{})
}
