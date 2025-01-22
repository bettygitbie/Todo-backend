The express server will run on port 5000. [http://localhost:5000](http://localhost:5000) 

I used Prisma to setup the model for the mysql database and used the following model: 
model Todo {
  id  Int @id @default(autoincrement())
  title String
  color String
  completed Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime  @updatedAt
}
