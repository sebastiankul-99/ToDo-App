package routes

import (
	controllers "../Controllers"
	"github.com/gofiber/fiber"
)

func Setup(app *fiber.App) {

	app.Post("/api/register", controllers.Register)
	app.Post("/api/signin", controllers.Login)
	app.Get("/api/user", controllers.User)
	app.Post("/api/signout", controllers.SignOut)
	app.Post("/api/addtask", controllers.AddTask)
	app.Post("/api/viewtasks", controllers.ViewTasks)
	app.Post("/api/viewalltasks", controllers.ViewAllTasks)
	app.Put("/api/changetaskstatus", controllers.UpdateTaskStatus)
	app.Delete("/api/deletetask", controllers.DeleteTask)
}
