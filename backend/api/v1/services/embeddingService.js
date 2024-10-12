import openai from "../../../config/openai.js";

class EmbeddingService {
    static async generateEmbedding(inputText) {
        try {
            const response = await openai.embeddings.create({
                model: 'text-embedding-ada-002',
                input: inputText
            })
            return response.data[0].embedding
        } catch (error) {
            throw new Error(`Error generating embedding: ${ error.message }`)
        }
    }
}

export default EmbeddingService