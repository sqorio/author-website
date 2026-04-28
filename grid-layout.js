/* ============================================================
   grid-layout.js — Single source of truth for mosaic tile positions.

   Both the live site (script.js) and the playground read from
   this file. To apply a new arrangement:
     1. Adjust in the playground
     2. Click "Save Layout" and copy the output
     3. Paste it here, replacing the tiles array below
   ============================================================ */

export const tiles = [
  { id: 't-portrait', label: 'Portrait', col: 1, colSpan: 1, row: 1, rowSpan: 4, color: '#3A3028', textColor: '#F4F0E8' },
  { id: 't-book', label: 'Book', col: 2, colSpan: 1, row: 1, rowSpan: 3, color: '#1B2B4B', textColor: '#F4F0E8' },
  { id: 't-quote1', label: 'T.C. Boyle', col: 1, colSpan: 1, row: 5, rowSpan: 1, color: '#1C1914', textColor: '#D4A017' },
  { id: 't-photo1', label: 'Photo 1', col: 2, colSpan: 1, row: 4, rowSpan: 3, color: '#2A2218', textColor: '#F4F0E8' },
  { id: 't-essays', label: 'Essays', col: 1, colSpan: 1, row: 6, rowSpan: 3, color: '#3A3530', textColor: '#F4F0E8' },
  { id: 't-bio', label: 'Ed Park', col: 1, colSpan: 1, row: 13, rowSpan: 1, color: '#1C1914', textColor: '#D4A017' },
  { id: 't-social', label: 'Social', col: 2, colSpan: 1, row: 7, rowSpan: 3, color: '#1C1914', textColor: '#F4F0E8' },
  { id: 't-stonybrook', label: 'Stony Brook', col: 1, colSpan: 1, row: 10, rowSpan: 3, color: '#E8E4D8', textColor: '#1A1814' },
  { id: 't-quote2', label: 'Kirkus', col: 2, colSpan: 1, row: 10, rowSpan: 1, color: '#1C1914', textColor: '#D4A017' },
  { id: 't-interviews', label: 'Interviews', col: 2, colSpan: 1, row: 11, rowSpan: 3, color: '#2A2218', textColor: '#F4F0E8' },
  { id: 't-app', label: 'Quill', col: 1, colSpan: 1, row: 14, rowSpan: 2, color: '#4A2D6A', textColor: '#F4F0E8' },
  { id: 't-mailing', label: 'Mailing', col: 1, colSpan: 2, row: 16, rowSpan: 2, color: '#FAF7F2', textColor: '#1A1814' },
  { id: 't-photo2', label: 'Photo 2', col: 1, colSpan: 1, row: 9, rowSpan: 1, color: '#1A1510', textColor: '#F4F0E8' },
];