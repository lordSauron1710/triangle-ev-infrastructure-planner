# Version 0 — EV Charging Capacity Planning Model

`original-excel-model.xlsx` is the unmodified optimization workbook produced for
the Fall 2024 ISE 501 course project at NC State.

SHA-256:
`83dac33bb33021574a452b3ab0128c0efb79c408bd2d1c1cf48a197aa35e3174`

## Provenance

The workbook was created as a team deliverable by:

- Sandeep Vangara
- Raveena Rajeswari Pandiyaraj
- Astha Pund
- Saumitra Ranjan
- Syed Aakif Zaid

It is archived here as a preserved source artifact. It should not be
interpreted as the current model implementation or as Sandeep's individual
work. The `src/` and `model/` directories contain separate web and optimization
work.

## Known limitations

- Three synthetic locations and three planning periods
- No geographic demand-to-site allocation
- Installation costs repeated across periods
- Missing persistence and several incomplete Solver constraints
- Scenario outputs maintained manually

These limitations define the archive's scope.
