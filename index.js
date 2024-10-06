exports.apiConnectionControler = () => {
    const apiRest = async (url, method = 'GET', body = null, headers = {}) => {
        // Validação da URL
        try {
            new URL(url); // Tenta criar uma nova URL para validar o formato
        } catch (error) {
            throw new Error("URL inválida fornecida.");
        }

        const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
        if (!validMethods.includes(method)) {
            throw new Error(`Método inválido: ${method}. Métodos válidos são: ${validMethods.join(', ')}`);
        }

        // Validação do corpo para POST e PUT
        if ((method === 'POST' || method === 'PUT') && body) {
            if (typeof body !== 'object' || body === null) {
                throw new Error("O corpo deve ser um objeto válido.");
            }
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
        }

        if (method === 'GET') {
            console.log('Fazendo requisição para:', url);
            console.log('Método:', method);
            console.log('Cabeçalhos:', Object.keys(headers).length === 0 ? 'Inativo' : headers);
        } else if (method === 'POST' || method === 'PUT') {
            console.log('Fazendo requisição para:', url);
            console.log('Método:', method);
            console.log('Cabeçalhos:', Object.keys(headers).length === 0 ? 'Inativo' : headers);
            console.log('Corpo:', method === 'GET' ? 'Não enviado' : body);
        }

        let response;
        try {
            response = await fetch(url, {
                method: method,
                headers: headers,
                body: method === 'GET' ? undefined : body
            });

            // Verifica a resposta da rede
            if (!response.ok) {
                const errorBody = await response.text();
                const errorMessage = `Erro na requisição: ${response.status} ${response.statusText} - ${errorBody}`;
                console.error(errorMessage);
                throw new Error(errorMessage);
            }

            // Verifica se o tipo de conteúdo é JSON
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const errorMessage = `Resposta inesperada: tipo de conteúdo inválido. Esperado: application/json. Recebido: ${contentType}`;
                console.error(errorMessage);
                throw new Error(errorMessage);
            }

            // Tenta retornar o corpo da resposta como JSON
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const apiGraphQL = async (url, query, variables = {}, headers = {}) => {
        try {
            new URL(url); // Validação da URL
        } catch (error) {
            throw new Error("URL inválida fornecida.");
        }

        const body = JSON.stringify({
            query: query,
            variables: variables
        });

        headers['Content-Type'] = 'application/json';

        let response;
        try {
            response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText} - ${errorBody}`);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error(`Resposta inesperada: tipo de conteúdo inválido. Esperado: application/json. Recebido: ${contentType}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const apiSOAP = async (url, xmlBody, headers = {}) => {
        try {
            new URL(url); // Validação da URL
        } catch (error) {
            throw new Error("URL inválida fornecida.");
        }

        // SOAP requer 'text/xml' como Content-Type
        headers['Content-Type'] = 'text/xml';

        let response;
        try {
            response = await fetch(url, {
                method: 'POST', // SOAP usa POST
                headers: headers,
                body: xmlBody // O corpo deve ser um XML string
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText} - ${errorBody}`);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("text/xml")) {
                throw new Error(`Resposta inesperada: tipo de conteúdo inválido. Esperado: text/xml. Recebido: ${contentType}`);
            }

            return await response.text(); // Para SOAP, a resposta geralmente é texto XML
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const apiJsonRPC = async (url, methodName, params = [], id = 1, headers = {}) => {
        try {
            new URL(url); // Validação da URL
        } catch (error) {
            throw new Error("URL inválida fornecida.");
        }

        const body = JSON.stringify({
            jsonrpc: "2.0",
            method: methodName,
            params: params,
            id: id
        });

        headers['Content-Type'] = 'application/json';

        let response;
        try {
            response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText} - ${errorBody}`);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error(`Resposta inesperada: tipo de conteúdo inválido. Esperado: application/json. Recebido: ${contentType}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    return{
        rest: apiRest,
        GQL: apiGraphQL,
        soap: apiSOAP,
        JRPC: apiJsonRPC
    }
};
