const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const PORT = process.env.PORT || 8080;

const root = require("./src/services/rootService");
const schema = require("./src/schemas/schema");

app.use(express.json());

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql:true
}));


app.get("/", (req, res) =>{
    res.send("Hola!")
});

app.listen(PORT, () => {
    console.log(`app running on port ${PORT} process: ${process.pid}`);
});
app.on('error', error => console.log(`Server error: ${error}`))

module.exports = app;