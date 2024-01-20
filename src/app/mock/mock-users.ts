// Importa la dipendenza necessaria. 
// In questo caso, importa la classe o interfaccia 'User' dal percorso specificato.
import { User } from "../model/user";

// Definisce un array costante di utenti. Questo array è tipizzato come un array di 'User', 
// il che significa che ogni elemento dell'array deve corrispondere alla struttura definita dalla classe o interfaccia 'User'.
export const MOCK_USERS: User[] = [
    // Ogni oggetto nell'array rappresenta un utente, con campi per 'id', 'nome' e 'cognome'.
    {id:1, nome:'alessandro', cognome:'marangoni'},
    {id:2, nome:'giulia', cognome:'granzuotto'},
    {id:3, nome:'marco', cognome:'bellafiore'},
    {id:4, nome:'antonio', cognome:'annunziata'},
    {id:5, nome:'eleonora', cognome:'lovo'},
    {id:6, nome:'edoardo', cognome:'eris'},
    {id:7, nome:'giulia', cognome:'coccato'},
    // Ogni oggetto è un record che rappresenta un utente, con un ID univoco e i campi 'nome' e 'cognome'.
]
