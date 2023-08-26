import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Show from './../Show';

test('renders without errors', () => { 
    render(<Show show={exampleShowData} selectedSeason={"none"}/>)
});

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null} selectedSeason={'none'}/>);
    const loading = screen.getByTestId("loading-container");
    expect(loading).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => {
    render(<Show show={exampleShowData} selectedSeason={"none"}/>);
    const seasons = screen.queryAllByTestId("season-option");
    expect(seasons).toHaveLength(3);
 });

test('handleSelect is called when an season is selected', () => { 
    render(<Show show={exampleShowData} selectedSeason={"none"} handleSelect={handleSelect}/>);
    const handleSelect = jest.fn();
    const select = screen.getByLabelText(/Select A Season/i);
    userEvent.selectOptions(select, '2');
    expect(handleSelect).toBeCalled;
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const {rerender} = render(<Show show={exampleShowData} selectedSeason={"none"}/>);
    let episodes = screen.queryByTestId("episodes-container");
    expect(episodes).not.toBeInTheDocument();
    rerender(<Show show={exampleShowData} selectedSeason={2}/>);
    episodes = screen.queryByTestId("episodes-container");
    expect(episodes).toBeInTheDocument();
});

const exampleShowData = {
    name: '',
    summary: '',
    seasons: [
        {
            id: 1,
            name: '',
            episodes: []
        },
        {
            id: 2,
            name: '',
            episodes: []
        },
        {
            id: 3,
            name: '',
            episodes: []
        }
    ]
}