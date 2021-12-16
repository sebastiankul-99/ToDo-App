package models

type User struct {
	Id       uint    `json:"id"`
	Name     string  `json:"name"`
	Email    string  `json:"email" gorm:"unique"`
	Password []byte  `json:"-"`
	Tasks    []Tasks `gorm:"foreignKey:UserId"`
}

type Tasks struct {
	Id       uint   `json:"id"`
	UserId   uint   `json:"userId,string,omitempty"`
	TaskName string `json:"taskName" gorm:"unique"`
	Status   string `json:"status" `
}
