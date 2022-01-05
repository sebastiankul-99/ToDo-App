package controllers

import (
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	database "github.com/sebastiankul-99/ToDo-App/Database"
	models "github.com/sebastiankul-99/ToDo-App/Models"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "secret"

func Register(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)
	user := models.User{
		Name:     data["name"],
		Email:    data["email"],
		Password: password,
	}
	user2 := models.User{
		Name:     data["name"],
		Email:    data["email"],
		Password: password,
	}
	database.DB.Where("email = ?", data["email"]).First(&user2)
	if user2.Id != 0 {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Email already exists",
		})
	}
	database.DB.Create(&user)
	return c.JSON(user)
}
func Login(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User
	database.DB.Where("email = ?", data["email"]).First(&user)
	if user.Id == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "User not found!",
		})
	}
	err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"]))
	if err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Wrong password!",
		})
	}
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.Id)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})
	token, err := claims.SignedString([]byte(SecretKey))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Couldnt sign in",
		})
	}
	cookie := fiber.Cookie{
		Name:     "Sign In Cookie",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "successful sign in",
	})
}
func User(c *fiber.Ctx) error {
	cookie := c.Cookies("Sign In Cookie")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)

	var user models.User
	database.DB.Where("id = ?", claims.Issuer).First(&user)
	return c.JSON(user)
}

func SignOut(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "Sign In Cookie",
		Value:    "token",
		Expires:  time.Now().Add(-time.Minute),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "Sign Out",
	})
}

func AddTask(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	id, _ := strconv.Atoi(data["userId"])
	task := models.Tasks{
		UserId:   uint(id),
		TaskName: data["taskName"],
		Status:   data["status"],
	}
	task2 := models.Tasks{
		UserId:   uint(id),
		TaskName: data["taskName"],
		Status:   data["status"],
	}
	database.DB.Where("user_id = ? and task_name = ?", id, data["taskName"]).First(&task2)
	if task2.Id != 0 {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Task already exists",
		})
	}
	database.DB.Create(&task)
	return c.JSON(task)
}
func ViewTasks(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	id, _ := strconv.Atoi(data["userId"])
	var tasks []models.Tasks
	println(data["status"])
	database.DB.Where("user_id = ? and status = ?", id, data["status"]).Find(&tasks)

	return c.JSON(tasks)
}
func ViewAllTasks(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	id, _ := strconv.Atoi(data["userId"])
	var tasks []models.Tasks
	println(data["status"])
	database.DB.Where("user_id = ?", id).Find(&tasks)

	return c.JSON(tasks)
}
func UpdateTaskStatus(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	id, _ := strconv.Atoi(data["id"])
	var tasks []models.Tasks
	database.DB.Model(&models.Tasks{}).Where("id = ?", id).Update("status", data["status"])
	return c.JSON(tasks)
}

func DeleteTask(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	id, _ := strconv.Atoi(data["Id"])
	database.DB.Delete(&models.Tasks{}, id)
	var tasks models.Tasks
	return c.JSON(tasks)
}
