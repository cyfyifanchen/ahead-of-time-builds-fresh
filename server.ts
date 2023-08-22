import { Application, Router } from "https://deno.land/x/oak/mod.ts"

const app = new Application()
const router = new Router()

let users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
]

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        ctx.response.status = error.status || 500
        ctx.response.body = { error: error.message }
    }
})

router.get("/users", (ctx) => {
    ctx.response.body = users
})

router.get("/users/:id", (ctx) => {
    const userId = parseInt(ctx.params.id)
    const user = users.find((u) => u.id === userId)

    if (user) {
        ctx.response.body = user
    } else {
        ctx.throw(404, "User not found")
    }
})

router.put("/users/:id", async (ctx) => {
    const userId = parseInt(ctx.params.id)
    const body = await ctx.request.body()

    if (!body.value.name || !body.value.email) {
        ctx.throw(400, "Name and email are required")
    }

    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...body.value }
        ctx.response.status = 204
    } else {
        ctx.throw(404, "User not found")
    }
})

app.use(router.routes())
app.use(router.allowedMethods())

console.log("Server is running on http://localhost:8000")

await app.listen({ port: 8000 })