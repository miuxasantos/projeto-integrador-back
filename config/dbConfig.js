const connection = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DATABASE: 'centauro',
    DIALECT: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

export default connection;