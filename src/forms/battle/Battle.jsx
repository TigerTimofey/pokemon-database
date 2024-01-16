import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import Badge from "@mui/material/Badge";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "transparent",
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Battle({ pokemonData, isShiny, listOfPokemons }) {
  const [open, setOpen] = useState(false);
  const [enemyPokemon, setEnemyPokemon] = React.useState("");

  React.useEffect(() => {}, [enemyPokemon]);

  const [hp, setHp] = React.useState(null);
  const [hpEnemy, setHpEnemy] = React.useState(null);

  const handleSearchEnemy = () => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon/${
        listOfPokemons[Math.floor(Math.random() * listOfPokemons.length)]
      }`
    )
      .then((response) => response.json())
      .then((enemyPokemon) => {
        console.log("enemyPokemon:", enemyPokemon);
        setEnemyPokemon(enemyPokemon);
        setHpEnemy(enemyPokemon?.stats[0].base_stat);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleOpen = () => {
    setOpen(true);
    setHp(pokemonData?.stats[0].base_stat);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFight = () => {
    // Get the attack stats for both the player and the enemy
    const yourAttackStat = pokemonData?.stats[1]?.base_stat;
    const enemyAttackStat = enemyPokemon?.stats[1]?.base_stat;

    // Calculate damage to the player and the enemy
    const damageToYou = enemyAttackStat;
    const damageToEnemy = yourAttackStat;

    // Calculate new hit points
    const newHpYou = hp - damageToYou;
    const newHpEnemy = hpEnemy - damageToEnemy;

    // Update hit points
    setHp(newHpYou >= 0 ? newHpYou : 0);
    setHpEnemy(newHpEnemy >= 0 ? newHpEnemy : 0);

    // Check if the battle is won or lost
    if (newHpEnemy <= 0) {
      console.log("You win!");
    } else if (newHpYou <= 0) {
      console.log("You lose!");
    } else {
      console.log("The battle continues!");
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          handleOpen();
          handleSearchEnemy();
        }}
        variant="outlined"
        color="warning"
      >
        BATTLE WITH POKEMON
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }} className="Battle">
          <TableContainer sx={{ bgcolor: "transparent" }}>
            <Table sx={{ minWidth: 10 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ border: "none", mb: 5, backgroundColor: "#0000005b" }}
                  >
                    <Badge
                      badgeContent="friend"
                      color="success"
                      size="small"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <Typography sx={{ color: "white", padding: 1 }}>
                        <b>{pokemonData?.name?.toUpperCase()}</b>
                      </Typography>
                    </Badge>{" "}
                    <br />
                    {pokemonData
                      ? `${hp} / ${pokemonData?.stats[0].base_stat}`
                      : null}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ border: "none", backgroundColor: "#0000005b" }}
                  >
                    <Badge
                      badgeContent="enemy"
                      color="error"
                      size="small"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <Typography sx={{ color: "white", padding: 1 }}>
                        <b>{enemyPokemon?.name?.toUpperCase()}</b>
                      </Typography>
                    </Badge>{" "}
                    <br />
                    {enemyPokemon
                      ? `${hpEnemy} / ${enemyPokemon?.stats[0].base_stat}`
                      : null}
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {pokemonData && (
                <CardMedia
                  sx={{
                    width: 130,
                    height: 130,
                    objectFit: "cover",
                    position: "absolute",
                  }}
                  image={
                    isShiny
                      ? pokemonData?.sprites.back_shiny ||
                        pokemonData?.sprites.front_shiny
                      : pokemonData?.sprites.back_default
                  }
                  title="Pokemon Image"
                />
              )}
            </Grid>

            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {enemyPokemon?.sprites?.front_default ? (
                <CardMedia
                  sx={{
                    width: 130,
                    height: 130,
                    objectFit: "cover",
                  }}
                  image={enemyPokemon.sprites.front_default}
                  title="Front Pokemon Image"
                />
              ) : (
                <div>Searching for a enemy..</div>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{ width: "40%", borderRadius: 20, opacity: 30 }}
              >
                <Typography variant="h6" onClick={handleFight}>
                  FIGHT
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
