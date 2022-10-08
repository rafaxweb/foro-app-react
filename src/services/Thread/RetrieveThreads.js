export async function RetrieveThreads() {

    const res = await fetch("http://localhost:8080/threads/list")
    const result = await res.json()
    return result
}