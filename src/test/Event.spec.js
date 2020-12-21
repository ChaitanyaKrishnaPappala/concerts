import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import {List, Map} from 'immutable'
import './setupTests'
import Event from '../components/Event'
import EventModal from '../components/EventModal'
import Modal from '../components/Modal'
import {PureEventsList} from '../containers/EventsList'
import {PureMap} from '../containers/Map'
import {PureFilters} from '../containers/Filters'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../redux/actions'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Event', () => {
    const events = [
        {
            Title: "Place 1",
            Time: "2018-07-22T02:30:00.000Z",
            Image: "http://example.com/image.png",
            Location: {
                City: "Brisbane",
                State: "Queensland",
                Country: "Australia",
            }
        },
        {
            Title: "Place 2",
            Time: "2018-07-24T02:30:00.000Z",
            Image: "http://example.com/image.png",
            Location: {
                City: "Cairns",
                State: "Queensland",
                Country: "Australia",
            },
            AvailableSeats: [
                {
                    id: "W25"
                },
                {
                    id: "B29"
                }
            ]
        },
        {
            Title: "Place 3",
            Time: "2018-07-24T02:30:00.000Z",
            Image: "http://example.com/image.png",
            Location: {
                City: "Gold Coast",
                State: "Queensland",
                Country: "Australia",
            },
            AvailableSeats: [
                {
                    id: "W25"
                },
                {
                    id: "B29"
                }
            ]
        },
        {
            Title: "Place 4",
            Time: "2018-07-24T02:30:00.000Z",
            Image: "http://example.com/image.png",
            Location: {
                City: "Gold Coast",
                State: "Queensland",
                Country: "Australia",
            },
            AvailableSeats: [
                {
                    id: "W25"
                },
                {
                    id: "B29"
                }
            ]
        },
        {
            Title: "Place 5",
            Time: "2018-07-24T02:30:00.000Z",
            Image: "http://example.com/image.png",
            Location: {
                City: "Gold Coast",
                State: "Queensland",
                Country: "Australia",
            },
            AvailableSeats: [
                {
                    id: "W25"
                },
                {
                    id: "B29"
                }
            ]
        },
        {
            Title: "Place 6",
            Time: "2018-07-24T02:30:00.000Z",
            Image: "http://example.com/image.png",
            Location: {
                City: "Gold Coast",
                State: "Queensland",
                Country: "Australia",
            },
            AvailableSeats: [
                {
                    id: "W25"
                },
                {
                    id: "B29"
                }
            ]
        },
        {
            Title: "Place 7",
            Time: "2018-07-24T02:30:00.000Z",
            Image: "http://example.com/image.png",
            Location: {
                City: "Gold Coast",
                State: "Queensland",
                Country: "Australia",
            },
            AvailableSeats: [
                {
                    id: "W25"
                },
                {
                    id: "B29"
                }
            ]
        },
        {
            Title: "Place 8",
            Time: "2018-07-24T02:30:00.000Z",
            Image: "http://example.com/image.png",
            Location: {
                City: "Gold Coast",
                State: "Queensland",
                Country: "Australia",
            },
            AvailableSeats: [
                {
                    id: "W25"
                },
                {
                    id: "B29"
                }
            ]
        },
    ]
    let wrapper
    it('Render Event', () => {
        wrapper = shallow(<Event event={Map({Title: 'Test'})} />)
        expect(wrapper.text()).to.contain('Test')
    })
    it('Render EventsList', () => {
        wrapper = shallow(<PureEventsList events={List(events)} fetchEvents={jest.fn()} />)
        expect(wrapper).to.exist
    })
    it('Render Map', () => {
        wrapper = shallow(<PureMap events={List(events)} />)
        expect(wrapper).to.exist
    })
    it('Render EventModal', () => {
        wrapper = shallow(<EventModal event={Map({Title: 'Test'})} isModalOpen toggleModalOpen={jest.fn()} />)
        expect(wrapper).to.exist
    })
    it('Render Filters', () => {
        wrapper = shallow(<PureFilters fetchEvents={jest.fn()} />)
        expect(wrapper).to.exist
    })
    it('Render Modal', () => {
        wrapper = shallow(<Modal
          children={<div />} title='test'
          overlayStyle={{}} contentStyle={{}} showModal onHandleClose={jest.fn()}
                          />)
        expect(wrapper).to.exist
    })

    test('should fetch events', async () => {
        const store = mockStore()
        await store.dispatch(actions.fetchEvents(''))
        const storeActions = store.getActions()
    })
})
