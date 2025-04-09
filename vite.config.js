import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {fileURLToPath} from 'node:url'
import {dirname, resolve} from 'node:path'
import { config } from 'dotenv'

config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    server: {
        port: 3000,
        host: 'localhost'
    }
})
