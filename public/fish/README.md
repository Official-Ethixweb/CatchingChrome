# Seasonal Catalogue — fish photos

Drop one photo per species here, using these exact filenames. The
"What's Running" section (`src/components/SeasonsSection.tsx`) picks them up
automatically. Until a file exists, the card falls back to an existing asset.

| Filename                | Species          | Shown in seasons        |
| ----------------------- | ---------------- | ----------------------- |
| `spring-chinook.jpg`    | Spring Chinook   | Spring                  |
| `sturgeon.jpg`          | Sturgeon         | Spring, Fall, Winter    |
| `winter-steelhead.jpg`  | Winter Steelhead | Spring, Winter          |
| `american-shad.jpg`     | American Shad    | Summer                  |
| `summer-steelhead.jpg`  | Summer Steelhead | Summer                  |
| `sockeye-salmon.jpg`    | Sockeye Salmon   | Summer                  |
| `fall-chinook.jpg`      | Fall Chinook     | Fall                    |
| `coho-salmon.jpg`       | Coho Salmon      | Fall                    |
| `cutthroat-trout.jpg`   | Cutthroat Trout  | Winter                  |

Notes:
- `.jpg` is expected. To use `.png`/`.webp`, update the `image` paths in
  `FISH` inside `SeasonsSection.tsx`.
- Landscape shots work best (the cards crop to a tall diagonal strip and zoom
  in ~1.45×), so keep the fish centered.
