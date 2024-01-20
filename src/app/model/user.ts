// Questa è la dichiarazione di un'interfaccia in TypeScript.
export interface User {
    // La definizione dell'interfaccia 'User' include tre proprietà.
    
    // 'id' è una proprietà che rappresenta un identificativo numerico per l'utente.
    // Ad esempio, ogni utente avrà un ID unico.
    id: number,

    // 'nome' è una stringa che rappresenta il nome dell'utente.
    // Ad esempio, potrebbe essere 'Alessandro', 'Giulia', ecc.
    nome: string,

    // 'cognome' è una stringa che rappresenta il cognome dell'utente.
    // Ad esempio, potrebbe essere 'Marangoni', 'Granzuotto', ecc.
    cognome: string,
}
