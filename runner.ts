import { $ } from "bun";

// * Upon exiting the script, the db container will need to be stopped
// via `bun run db:down`
const run = async () => {
    await Promise.all([
        $`bun run db:up`,
        $`bun run server:dev`,
        $`bun run client:dev`
    ])
}

run().catch(e => {
    console.error(e)
    process.exit(1)
})
