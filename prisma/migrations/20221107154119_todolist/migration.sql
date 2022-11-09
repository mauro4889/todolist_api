-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT NOT NULL,
    "task" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinishedTask" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "task" TEXT NOT NULL,

    CONSTRAINT "FinishedTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CancelTask" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "task" TEXT NOT NULL,

    CONSTRAINT "CancelTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedTask" ADD CONSTRAINT "FinishedTask_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CancelTask" ADD CONSTRAINT "CancelTask_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
