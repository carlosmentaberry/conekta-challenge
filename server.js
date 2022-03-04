const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const PORT = process.env.PORT || 8080;

const root = require("./src/services/rootService");
const schema = require("./src/schemas/schema");
// const userRoutes = require("./src/routes/userRoutes");
// const initiativeRoutes = require("./src/routes/initiativeRoutes");

app.use(express.json());

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql:true
}));


// app.use("/api/users", userRoutes);
// app.use("/api/initiatives", initiativeRoutes);

app.listen(PORT, () => {
    console.log(`app running on port ${PORT} process: ${process.pid}`);
});

module.exports = app;