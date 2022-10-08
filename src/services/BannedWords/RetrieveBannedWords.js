
export async function RetrieveBannedWords() {

    const res = await fetch("http://localhost:8080/banned-words/get")
    const result = await res.json()
    return result
}
