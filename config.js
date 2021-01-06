export const {
    PORT = 5000,
    NODE_ENV = 'development',
    MONGO_URI = 'mongodb+srv://ritvik:ritvik123@databaseforbookapi-gzios.mongodb.net/test?retryWrites=true&w=majority',
    SESS_NAME = 'sid',
    SESS_SECRET = 'secret!session',
    SESS_LIFETIME = 1000 * 60 * 60 * 2
  } = process.env;
  
//choose any port except 3000, we will reserve it for our react client