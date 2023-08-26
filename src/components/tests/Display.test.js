import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Display from './../Display';
import mockFetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');

test('renders without errors with no props', async () => { 
    render(<Display />)
});

test('renders Show component when the button is clicked ', async() => { 
    mockFetchShow.mockResolvedValueOnce(exampleShowData);
    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    const show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async() => { 
    mockFetchShow.mockResolvedValueOnce(exampleShowData);
    const displayFunc = jest.fn();
    render(<Display displayFunc={displayFunc}/>);
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(()=> {
        expect(displayFunc).toHaveBeenCalled();
    })
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