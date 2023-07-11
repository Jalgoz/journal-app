export const initialState = {
  isSaving: false,
  notes: [],
  active: null,
};

export const notes = [
  {
    id: 'ABC123',
    title: 'Note 1',
    body: 'Test',
    date: 123456,
    imageUrls: ['https://foto1.jpg', 'https://foto2.jpg'],
  },
  {
    id: 'ABC124',
    title: 'Note 2',
    body: 'Test',
    date: 123457,
    imageUrls: ['https://foto3.jpg', 'https://foto4.jpg'],
  },
];

export const stateWithNotes = {
  isSaving: false,
  notes: [...notes],
  active: {
    id: 'ABC123',
    title: 'Note 1',
    body: 'Test',
    date: 123456,
    imageUrls: ['https://foto1.jpg', 'https://foto2.jpg'],
  },
};