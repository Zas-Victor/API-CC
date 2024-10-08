class apiCenterControl {

    async get(url, header = {}) {
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: header
            });
            if (!response.ok) {
                console.log(`Falha ao conectar a API ( ${url} )`);
                return null; // Retorna null em caso de erro
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return null; // Retorna null em caso de erro
        }
    };

    async post(url, header = {}, body = {}) {
        try {
            if (typeof body !== "object" || body === null) {
                console.log('Adicione uma variável com um objeto para ser enviado à API!');
                return null; // Retorna null em caso de erro
            }
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    ...header,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                console.log(`Falha ao conectar a API ( ${url} )`);
                return null; // Retorna null em caso de erro
            }
            return await response.json(); // Retorna o JSON da resposta
        } catch (error) {
            console.error(error);
            return null; // Retorna null em caso de erro
        }
    };

    async update(url, key = null, header = {}, body = {}) {
        try {
            if (typeof body !== "object" || body === null) {
                console.log('Adicione uma variável com um objeto para ser enviado à API!');
                return null; // Retorna null em caso de erro
            }

            let response = await fetch(url, {
                method: 'GET',
                headers: header
            });

            if (!response.ok) {
                console.log(`Falha ao conectar à API ( ${url} ) - Código: ${response.status}`);
                return null; // Retorna null em caso de erro
            }

            const keys = await response.json();

            if (!keys.hasOwnProperty(key)) {
                console.log('Propriedade não existente');
                return null; // Retorna null em caso de erro
            }

            const updatedBody = { ...keys, [key]: body };
            const method = Object.keys(body).length === 1 ? 'PATCH' : 'PUT';

            response = await fetch(url, {
                method: method,
                headers: {
                    ...header,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBody)
            });

            if (!response.ok) {
                console.log(`Erro ao atualizar a API ( ${url} ) - Código: ${response.status}`);
                return null; // Retorna null em caso de erro
            }

            console.log('Atualização bem-sucedida!');
            return await response.json(); // Retorna o JSON da resposta
        } catch (error) {
            console.error('Erro na requisição:', error);
            return null; // Retorna null em caso de erro
        }
    };

    async delete(url, header = {}) {
        try {
            let response = await fetch(url, {
                method: 'DELETE',
                headers: header
            });

            if (!response.ok) {
                console.log(`Falha ao conectar à API ( ${url} ) - Código: ${response.status}`);
                return null; // Retorna null em caso de erro
            }
            console.log('Exclusão bem-sucedida!');
            return true; // Retorna verdadeiro em caso de sucesso
        } catch (error) {
            console.error('Erro na requisição:', error);
            return null; // Retorna null em caso de erro
        }
    };
};

module.exports = apiCenterControl;
