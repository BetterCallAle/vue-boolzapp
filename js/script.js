const {createApp} = Vue;

/* Initialize Luxon */
const dateTime = luxon.DateTime;

/* Setting VueJs */
createApp({
    data(){
        return{
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],

            indexActive: 0,

            myMessage: {
                date: this.getDate(),
                message: '',
                status: 'sent'
            },

            botMessage:{
                date: this.getDate(),
                message: '',
                status: 'received'
            },

            presetBotMessages: ["Certo!", "Va bene", "lol", "Ho visto", "How I Met Your Mother è la miglior serie comedy che ci sia", "Non posso rispondere, ti chiamo io dopo", "Ricordami che devo farti sentire una canzone"],

            userSearch: "",

            today: this.getDate(),

            optionIndex: 0
        }
    },
    methods:{
        // Make the element clicked active
        activateThisContact(index){
            this.indexActive = index;
        },

        // push the input saved in myMessage in messages 
        sendMessage(){
            if(this.myMessage.message.length > 0){
                this.contacts[this.indexActive].messages.push({...this.myMessage});

                // after one sec the bot will respond with a random phrase
                setTimeout(()=>{
                    this.botMessage.message = this.presetBotMessages[this.generateRndNumber(0, this.presetBotMessages.length - 1)]
                    this.contacts[this.indexActive].messages.push({...this.botMessage})
                }, 1000)

                // clear the input
                this.myMessage.message = '';
            }
        },

        // Generate a random number
        generateRndNumber(min, max){
            return Math.floor(Math.random() * (max - min + 1) + min)
        },

        // generate the current date
        getDate(){
            return dateTime.now().setLocale("it").toLocaleString(dateTime.DATETIME_SHORT_WITH_SECONDS)
        },

        // check if in the input there are the same letters present in the names in contacts
        checkTheUserSearch(){
           this.contacts.forEach((element) => {

                if(this.userSearch.length > 0){
                    // make the first letter in the input uppercase
                    const userSearchFormatted = this.userSearch[0].toUpperCase() + this.userSearch.slice(1);
                    // if input letters are present in contacts name make display: none all the rest
                    element.name.includes(userSearchFormatted) ? element.visible = true : element.visible = false
                } else {
                    // if the input search length is 0 make all contacts visible
                    element.visible = true
                }

           });
        },
        
        // Make all contacts visibile when clicking on X
        clearInput(){
            this.userSearch = "";
            this.contacts.forEach((element) => {
                element.visible = true
            });
        },

        // Make the option menu appear by clicking a message
        showOptions(chat, index){
            // hiding the prev menu if was open
            this.hideMenu();
            this.optionIndex = index;
            
            // show the menu
            chat.isMenuActive = true;
        },

        // Hide the option menu
        hideMenu(){
            this.contacts.forEach(element => {
                // if the length of messages is minor than option index make option index = 0
                if(element.messages.length - 1 < this.optionIndex){
                    this.optionIndex = 0
                } else {
                    element.messages[this.optionIndex].isMenuActive = false;
                }
            })
        },

        // delete a message
        deleteMessage(){ 
            let emptyMessage = {
                date: "",
                message: '',
                status: "hidden"
            }
                
            if(this.contacts[this.indexActive].messages.length === 1){
                this.contacts[this.indexActive].messages.push(emptyMessage)
                this.contacts[this.indexActive].messages.splice(this.optionIndex, 1)
            } else  {
                this.contacts[this.indexActive].messages.splice(this.optionIndex, 1)
            }
        }
    }
}).mount("#app")