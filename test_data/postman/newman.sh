#!/bin/bash
set -u
newman run --environment biobtree_local.postman_environment.json biobtree_default.postman_collection.json
newman run --environment biobtree_local.postman_environment.json  biobtree_builtindb1.postman_collection.json > newman_result.json
go run main.go -db builtin1usecases
rm newman_result.json

newman run --environment biobtree_local.postman_environment.json  biobtree_builtindb4.postman_collection.json > newman_result.json
go run main.go -db builtin4usecases
rm newman_result.json
