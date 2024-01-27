import { createSale } from "./actions";

export default function SaleForm() {
  return (
    <form action={createSale} className="grid col-span-1">
      <label htmlFor="title">Sale title</label>
      <input id="title" type="text" placeholder="title of your sale" name="title"/>
      <label htmlFor="description">Sale description</label>
      <input
        id="description"
        type="text"
        placeholder="description of your sale"
        name="description"
      />
      <label htmlFor="opening-date"> opening date </label>
      <input
        id="opening-date"
        type="datetime-local"
        placeholder="pick a opening date for your auction"
        name="openingDate"
      />
      <label htmlFor="closing-date">closing date</label>
      <input
        id="closing-date"
        type="datetime-local"
        placeholder="pick a closing date for your auction"
        name="closingDate"
      />
      <button type="submit">create sale</button>
    </form>
  );
}

/* query
    createSale: {
    title: "Basta's test auction",
    description: "Test to see if an auction is created",
    dates: {
      openDate: new Date(Date.now()).toISOString(),
      closingDate: new Date(Date.now() + 5000).toISOString(),
    },
    currency: "USD",
    bidIncrementTable: {
      rules: [
        { lowRange: 0, highRange: 100000, step: 10000 },
        { lowRange: 100000, highRange: 500000, step: 25000 },
      ],
    },
    closingMethod: ClosingMethod.Overlapping,
    closingTimeCountdown: 60000,
  } */

/*    
const CREATE_SALE = `mutation CREATE_SALE($accountId: String!, $input: CreateSaleInput!) {
  createSale(accountId: $accountId, input: $input) {
    __typename
    id
    accountId
    title
    description
    currency
    status
    sequenceNumber
    closingMethod
    closingTimeCountdown
    images {
      __typename
      id
      url
      order
    }
    items {
      __typename
      edges {
        __typename
        cursor
        node {
          __typename
          id
          title
          totalBids
          description
          currentBid
          leaderId
          saleId
          reserve
          startingBid
          status
          lowEstimate
          highEstimate
          itemNumber
          images {
            __typename
            id
            url
            order
          }
          bids {
            __typename
            bidId
            amount
            maxAmount
            userId
            date
            bidStatus
            bidSequenceNumber
            bidderIdentifier
          }
          dates {
            __typename
            closingStart
            closingEnd
          }
        }
      }
      pageInfo {
        __typename
        startCursor
        endCursor
        hasNextPage
      }
    }
    incrementTable {
      __typename
      rules {
        __typename
        highRange
        lowRange
        step
      }
    }
    dates {
      __typename
      closingDate
      openDate
    }
    participants {
      __typename
      totalCount
      edges {
        __typename
        cursor
        node {
          __typename
          userId
        }
      }
      pageInfo {
        __typename
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
}`; */
