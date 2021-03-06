"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPjson = {
    name: '',
    version: '1.0.0',
    description: 'My Prisma Service',
};
exports.defaultDefinition = {
    modules: [
        {
            name: '',
            content: "# Welcome to Prisma!\n#\n# This file is the main config file for your Prisma Service.\n# It's very minimal at this point and uses default values.\n# We've included a hello world function here.\n# Just run `prisma deploy` to have the first running Prisma Service.\n#\n# Check out some examples:\n#    https://github.com/prisma/framework/tree/master/examples\n#\n# Here are the reference docs of this definition format:\n# https://www.graph.cool/docs/reference/service-definition/prisma.yml-foatho8aip\n#\n# Happy Coding!\n\n\n# In the types.graphql you define your data schema\ntypes: ./types.graphql\n\n\nfunctions:\n  hello:\n    handler:\n      code: src/hello.js\n    type: resolver\n    schema: src/hello.graphql\n\n\n# Model/Relation permissions are used to limit the API access\n# To take the burden of thinking about those while development, we\n# preconfigured the wildcard (\"*\") permission that allows everything\n# Read more here:\n# https://www.graph.cool/docs/reference/auth/authorization/overview-iegoo0heez\npermissions:\n  - operation: \"*\"\n\n\n# Your root tokens used for functions to get full access to the API\n# Read more here:\n# https://www.graph.cool/docs/reference/auth/authentication/authentication-tokens-eip7ahqu5o\n# rootTokens:\n#   - mytoken\n\n",
            files: {
                './types.graphql': "# The following types define the data model of the example service\n# based on which the GraphQL API is generated\n\ntype User @model {\n  id: ID! @isUnique\n  name: String\n  dateOfBirth: DateTime\n\n  # Uncomment below - you can declare relations between models like this\n\n  # posts: [Post!]! @relation(name: \"UserPosts\")\n}\n\n\n# Uncomment the model below as well\n\n# type Post @model {\n#   id: ID! @isUnique\n#   title: String!\n#\n#   # Every relation also required a back-relation (to determine 1:1, 1:n or n:m)\n#   author: User! @relation(name: \"UserPosts\")\n# }\n",
                './src/hello.js': "export default async event => {\n  // you can use ES7 with async/await and even TypeScript in your functions :)\n\n  await new Promise(r => setTimeout(r, 50))\n\n  return {\n    data: {\n      message: `Hello ${event.data.name || 'World'}`\n    }\n  }\n}",
                './src/hello.graphql': "type HelloPayload {\n  message: String!\n}\n\nextend type Query {\n  hello(name: String): HelloPayload\n}\n",
            },
        },
    ],
};
exports.changedDefaultDefinition = {
    modules: [
        {
            name: '',
            content: "# This is the changed default definition, used in tests\n#\n# This file is the main config file for your Prisma Service.\n# It's very minimal at this point and uses default values.\n# We've included a hello world function here.\n# Just uncomment it and run `prisma deploy`\n#\n# Check out some examples:\n#    https://github.com/prisma/framework/tree/master/examples\n#\n# Happy Coding!\n\n\n# GraphQL types\ntypes: ./types.graphql\n\n\n# uncomment this:\n\n# functions:\n#   hello:\n#     handler:\n#       code:\n#         src: ./code/hello.js\n#     type: resolver\n#     schema: ./code/hello.graphql\n\n\n# Prisma modules\nmodules: {}\n\n\n# Model/Relation permissions\npermissions:\n- operation: \"*\"\n\n\n# Permanent Auth Token / Root Tokens\nrootTokens: []\n\n",
            files: {
                './types.graphql': "# This file contains the GraphQL Types\n\n# All types need to have the three fields id, updatedAt and createdAt like this:\n\ntype User implements Node {\n  id: ID! @isUnique\n  createdAt: DateTime!\n  updatedAt: DateTime!\n}\n\n\n# Prisma has one special type, the File type:\n\n# type File implements Node {\n#   contentType: String!\n#   createdAt: DateTime!\n#   id: ID! @isUnique\n#   name: String!\n#   secret: String! @isUnique\n#   size: Int!\n#   updatedAt: DateTime!\n#   url: String! @isUnique\n# }\n\ntype Post implements Node {\n  id: ID! @isUnique\n  title: String\n}\n",
                './code/hello.js': "module.exports = event => {\n  return {\n    data: {\n      message: `Hello ${event.data.name || 'World'}`\n    }\n  }\n}",
                './code/hello.graphql': "type HelloPayload {\n  message: String!\n}\n\nextend type Query {\n  hello(name: String): HelloPayload\n}\n",
            },
        },
    ],
};
exports.advancedDefinition = {
    modules: [
        {
            name: '',
            content: 'types: ./types.graphql\nfunctions:\n  filter-posts:\n    handler:\n      code:\n        src: ./code/filter-posts.js\n    type: operationBefore\n    operation: Post.create\n  log-posts:\n    handler:\n      code:\n        src: ./code/log-posts.js\n    type: subscription\n    query: ./code/log-posts.graphql\n  weather:\n    handler:\n      code:\n        src: ./code/weather.js\n    type: resolver\n    schema: ./code/weather.graphql\npermissions:\n- operation: File.read\n- operation: File.create\n- operation: File.update\n- operation: File.delete\n- operation: Post.read\n- operation: Post.update\n- operation: Post.delete\n- operation: Post.create\n  authenticated: true\n- operation: User.read\n- operation: User.create\n- operation: User.update\n- operation: User.delete\nrootTokens: []\n',
            files: {
                './types.graphql': 'type File implements Node {\n  contentType: String!\n  createdAt: DateTime!\n  id: ID! @isUnique\n  name: String!\n  secret: String! @isUnique\n  size: Int!\n  updatedAt: DateTime!\n  url: String! @isUnique\n}\n\ntype User implements Node {\n  createdAt: DateTime!\n  id: ID! @isUnique\n  updatedAt: DateTime!\n}\n\ntype Post implements Node {\n  title: String!\n  description: String!\n  createdAt: DateTime!\n  id: ID! @isUnique\n  updatedAt: DateTime!\n}',
                './code/log-posts.js': '// Click "EXAMPLE EVENT" to see whats in `event`\nmodule.exports = function (event) {\n  console.log(event.data)\n  return {data: event.data}\n}\n',
                './code/log-posts.graphql': 'subscription {\n  Post(filter: {\n    mutation_in: [CREATED, UPDATED, DELETED]\n  }) {\n    updatedFields\n    node {\n      id\n    }\n  }\n}',
                './code/filter-posts.js': "// Click \"EXAMPLE EVENT\" to see whats in `event`\nmodule.exports = function (event) {\n  console.log(event.data)\n  if (event.data.createPost.description.includes('bad') {\n  \treturn {error: 'bad is not allowed'}\n  }\n  return {data: event.data}\n}\n",
                './code/weather.js': "const fetch = require('node-fetch')\n\nmodule.exports = function (event) {\n  const city = event.data.city\n  return fetch(getApiUrl(city))\n  .then(res => res.json())\n  .then(data => {\n    console.log(data)\n    return {\n      data: {\n        temperature: data.main.temp,\n        pressure: data.main.pressure,\n        windSpeed: data.wind.speed,\n      }\n    }\n  })\n}\n\nfunction getApiUrl(query) {\n\treturn `http://samples.openweathermap.org/data/2.5/weather?q=${query}&appid=b1b15e88fa797225412429c1c50c122a1`\n  }",
                './code/weather.graphql': 'type WeatherPayload {\n  temperature: Float!\n  pressure: Float!\n  windSpeed: Float!\n}\n\nextend type Query {\n  weather(city: String!): WeatherPayload\n}\n',
            },
        },
    ],
};
exports.examples = {
    blank: exports.defaultDefinition,
    instagram: exports.advancedDefinition,
    stripe: exports.advancedDefinition,
    sendgrid: exports.advancedDefinition,
};
//# sourceMappingURL=examples.js.map