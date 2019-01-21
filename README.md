# Jackpot Reviews

> Project description

## Related Projects

  - https://github.com/jackpot-3/reviews-service
  - https://github.com/jackpot-3/cart
  - https://github.com/jackpot-3/nav
  - https://github.com/jackpot-3/product_detail_service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [API](#API)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
## API

Get Post Put(Admin Only) Delete(Admin Only) Reviews \
PUT & DELETE will use an 64 digit hash as a prefix \
for route security.

- GET /reviews/all/:productid
- GET /reviews/average/:productid
- POST /reviews/helpful/:reviewId
- PUT /reviews/:reviewId/:reviewText
- DELETE /reviews/:reviewId
