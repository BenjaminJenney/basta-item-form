import { createBastaAuction } from "./actions";

export default function SaleForm() {
  return (
    <form action={createBastaAuction} className="w-full">
      <label htmlFor="title">Sale title</label>
      <input id="title" type="text" placeholder="title of your sale" name="title" defaultValue={`test sale`}/>
      <label htmlFor="description">Sale description</label>
      <input
        id="description"
        type="text"
        placeholder="description of your sale"
        name="description"
        defaultValue={`my test sale`}
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
/* {
  '$ACTION_ID_2f1c59a13c66f7faf626a8f2e37dd21df54868f2': '',
  title: 'test sale',
  description: 'my awesome sale',
  openingDate: '2024-01-29T08:02',
  closingDate: '2024-01-30T08:00'
}
{
  accountId: 'b8a7f554-30f2-415a-afbd-9e3fe5a033c9',
  closingTimeCountdown: 60000,
  dates: {
    __typename: 'SaleDates',
    closingDate: '2024-01-30T08:00:00Z',
    openDate: '2024-01-29T08:02:00Z'
  },
  id: 'ce01e56e6-1c14660000070004',
  images: [],
  items: [],
  participants: [],
  sequenceNumber: 0,
  title: 'test sale',
  closingMethod: 'OVERLAPPING',
  description: 'my awesome sale',
  incrementTable: { __typename: 'BidIncrementTable', rules: [ [Object], [Object] ] },
  status: 'UNPUBLISHED'
} */

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
