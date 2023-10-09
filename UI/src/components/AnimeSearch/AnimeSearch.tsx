import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import useGetAnime from "../../hooks/useGetAnime";
import styles from "./AnimeSearch.module.scss";
import { AlphaFilter } from "./AlphaFilter/AlphaFilter";
import { DropdownFilter } from "../Shared/DropdownFilter/DropdownFilter";
import {
  RATING_FILTERS,
  SCORE_FILTERS,
  TYPE_FILTERS,
} from "../../util/constants";
import { FilterTypes, SelectedFilters, SortTypes } from "../../models/Filter";
import Typography from "@mui/material/Typography";
import { AnimeTile } from "./AnimeTile/AnimeTile";
import { animeUtil } from "../../util/animeUtil";

export function AnimeSearch() {
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedChar, setSelectedChar] = useState<string>("");
  const [sort, setSort] = useState<SortTypes>(SortTypes.title);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: SelectedFilters;
  }>({});
  const { animeData, loading } = useGetAnime(
    currentPage,
    sort,
    selectedChar,
    selectedFilters
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCharSelect = (char: string) => {
    const ch = char === "All" ? "" : char;
    setSelectedChar(ch);
    setCurrentPage(1);
  };

  const handleFilterSelect = (
    filters: string[],
    filterType: FilterTypes,
    newSort?: SortTypes
  ) => {
    if (filters.length > 0) {
      const updatedFilters: {
        [key: string]: SelectedFilters;
      } = {
        ...selectedFilters,
        [filterType as string]: { filters, filterType },
      };
      setSelectedFilters(updatedFilters);
    } else {
      const updatedFilters: {
        [key: string]: SelectedFilters;
      } = {
        ...selectedFilters,
      };
      delete updatedFilters[filterType as string];
      setSelectedFilters(updatedFilters);
    }

    if (newSort) {
      setSort(newSort);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!loading && animeData) {
      const { pagination } = animeData;
      setPageCount(
        Math.ceil(pagination?.items.total / pagination?.items.per_page)
      );
    }
  }, [animeData, loading]);

  return (
    <Box className={styles.animeListContainer}>
      <DropdownFilter
        filters={RATING_FILTERS}
        dropdownLabel="Ratings Select"
        filterType={FilterTypes.rating}
        handleSelectedFilters={(filters, filterType) =>
          handleFilterSelect(filters, filterType)
        }
        isMultiSelect
      />
      <DropdownFilter
        filters={TYPE_FILTERS}
        dropdownLabel="Sort by Type"
        filterType={FilterTypes.type}
        handleSelectedFilters={(filters, filterType) =>
          handleFilterSelect(filters, filterType)
        }
        isMultiSelect
      />
      <DropdownFilter
        filters={SCORE_FILTERS}
        dropdownLabel="Sort by Score"
        filterType={FilterTypes.sort}
        handleSelectedFilters={(filters, filterType) =>
          handleFilterSelect(filters, filterType, SortTypes.score)
        }
        isMultiSelect={false}
      />
      <AlphaFilter selectChange={(ch) => handleCharSelect(ch)} />
      {!loading && animeData && (
        <>
          <Typography className={styles.totalCountLabel}>
            Anime Count: {animeData?.pagination?.items.total}
          </Typography>
          <ImageList cols={6}>
            {animeData?.data?.map((show: any) => (
              <ImageListItem
                sx={{
                  maxWidth: "270px",
                  maxHeight: "420px",
                  width: "100%",
                  height: "100%",
                }}
                key={show.mal_id}
              >
                <AnimeTile
                  key={show?.mal_id}
                  titles={show?.titles
                    ?.filter(
                      (t) =>
                        t.type === "Default" ||
                        t.type === "English" ||
                        t.type === "Japanese"
                    )
                    .map((t) => ({
                      text: t.title,
                      order: animeUtil.getOrderByType(t.type),
                    }))}
                  imageUrl={
                    show?.images?.webp?.large_image_url ??
                    show?.images?.jpg?.large_image_url ??
                    ""
                  }
                  trailerUrl={show?.trailer?.url}
                  score={show?.score}
                  type={show?.type}
                  rating={show?.rating}
                />
              </ImageListItem>
            ))}
          </ImageList>
          <Pagination
            count={pageCount}
            page={currentPage}
            siblingCount={2}
            boundaryCount={1}
            sx={{
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "rgb(119, 136, 153, 35%)",
                fontWeight: "bold",
              },
            }}
            onChange={(_, page) => handlePageChange(page)}
          />
        </>
      )}
    </Box>
  );
}
