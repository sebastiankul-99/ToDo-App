package database

import (
	models "../Models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	username := ""
	password := ""
	database := ""
	connection, err := gorm.Open(mysql.Open(username+":"+password+"@/"+database), &gorm.Config{})
	if err != nil {
		panic("Couldnt connect to database")
	}
	DB = connection
	connection.AutoMigrate(&models.User{})
	connection.AutoMigrate(&models.Tasks{})
}
