// models/role.model.js
[{
    _id: ObjectId,
    name: "Super Admin",
    category: "Primary", // Primary, Secondary, etc.
    permissions: [
      "CREATE_ADMIN",
      "DELETE_ADMIN",
      "MANAGE_USERS",
      "ALL_ACCESS"
    ]
  }
]