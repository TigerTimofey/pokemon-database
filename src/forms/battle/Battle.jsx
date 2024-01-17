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

import HpImage from "./images/hp.png";
import AttackImage from "./images/attack.png";

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

  const [showMissBadge, setShowMissBadge] = React.useState(false);
  const [showMissBadgeFriend, setShowMissBadgeFriend] = React.useState(false);
  const [showAttackEnemy, setShowAttackEnemy] = React.useState(false);
  const [showAttackFriend, setShowAttackFriend] = React.useState(false);

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
    const yourAttackStat = pokemonData?.stats[1]?.base_stat;
    const enemyAttackStat = enemyPokemon?.stats[1]?.base_stat;

    const isYourMiss = Math.random() < 0.2;
    const isEnemyMiss = Math.random() < 0.1; // Reduced miss chance for enemy

    const damageToYou = isYourMiss ? 0 : enemyAttackStat;
    const damageToEnemy = isEnemyMiss ? 0 : yourAttackStat;

    const newHpYou = hp - damageToYou;
    const newHpEnemy = hpEnemy - damageToEnemy;

    setHp(newHpYou >= 0 ? newHpYou : 0);
    setHpEnemy(newHpEnemy >= 0 ? newHpEnemy : 0);

    setShowAttackEnemy(true);
    setShowAttackFriend(true);

    if (isYourMiss) {
      console.log("Enemy missed!");
      setShowMissBadge(true);

      setTimeout(() => {
        setShowMissBadge(false);
        setShowAttackEnemy(false);
        setShowAttackFriend(false);
      }, 1000);
    } else if (isEnemyMiss) {
      console.log("You missed!");
      setShowMissBadgeFriend(true);

      setTimeout(() => {
        setShowMissBadgeFriend(false);
        setShowAttackEnemy(false);
        setShowAttackFriend(false);
      }, 1000);
    } else if (newHpEnemy <= 0) {
      console.log("You win!");
      setTimeout(() => {
        setShowAttackEnemy(false);
        setShowAttackFriend(false);
      }, 2000);
    } else if (newHpYou <= 0) {
      console.log("You lose!");
      setShowAttackEnemy(false);
      setShowAttackFriend(false);
    } else {
      console.log("The battle continues!");

      if (showAttackEnemy) {
        setTimeout(() => {
          setShowAttackEnemy(true);
          setShowAttackEnemy(false);
        }, 2000);
      }

      if (showAttackFriend) {
        setTimeout(() => {
          setShowAttackFriend(true);
          setShowAttackFriend(false);
        }, 2000);
      }
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
        sx={{ padding: 2, marginLeft: 5 }}
      >
        BATTLE
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
                    {pokemonData ? (
                      <div>
                        <Typography
                          component="span"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <CardMedia
                            component="img"
                            sx={{ width: 20, height: 20, mr: 1 }}
                            image={HpImage}
                            alt="HP Image"
                          />
                          {`${hp} / ${pokemonData?.stats[0].base_stat}`}
                        </Typography>
                      </div>
                    ) : null}
                    {pokemonData ? (
                      <div>
                        <Typography
                          component="span"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <CardMedia
                            component="img"
                            sx={{ width: 20, height: 20, mr: 1 }}
                            image={AttackImage}
                            alt="Attack Image"
                          />
                          {`${pokemonData?.stats[1].base_stat}`}
                        </Typography>
                      </div>
                    ) : null}
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
                    {enemyPokemon ? (
                      <div>
                        <Typography
                          component="span"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <CardMedia
                            component="img"
                            sx={{ width: 20, height: 20, mr: 1 }}
                            image={HpImage}
                            alt="HP Image"
                          />
                          {`${hp} / ${enemyPokemon?.stats[0].base_stat}`}
                        </Typography>
                      </div>
                    ) : null}
                    {enemyPokemon ? (
                      <div>
                        <Typography
                          component="span"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <CardMedia
                            component="img"
                            sx={{ width: 20, height: 20, mr: 1 }}
                            image={AttackImage}
                            alt="Attack Image"
                          />
                          {`${enemyPokemon?.stats[1].base_stat}`}
                        </Typography>
                      </div>
                    ) : null}
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
              <>
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
                {showMissBadgeFriend ? (
                  <Badge
                    badgeContent="Miss"
                    sx={{
                      position: "absolute",
                      marginTop: 3,
                      marginRight: 18,
                    }}
                    color="error"
                  />
                ) : (
                  showAttackFriend &&
                  showAttackFriend && (
                    <Badge
                      badgeContent="Attack"
                      sx={{
                        position: "absolute",
                        marginTop: 3,
                        marginRight: 18,
                      }}
                      color="success"
                    />
                  )
                )}
              </>
            </Grid>

            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {enemyPokemon?.sprites?.front_default ? (
                <>
                  {" "}
                  <CardMedia
                    sx={{
                      width: 130,
                      height: 130,
                      objectFit: "cover",
                    }}
                    image={enemyPokemon.sprites.front_default}
                    title="Front Pokemon Image"
                  />
                  {showMissBadge ? (
                    <Badge
                      badgeContent="Miss"
                      sx={{
                        position: "absolute",
                        marginTop: 3,
                        marginRight: 18,
                      }}
                      color="error"
                    />
                  ) : (
                    showAttackEnemy &&
                    showAttackEnemy && (
                      <Badge
                        badgeContent="Attack"
                        sx={{
                          position: "absolute",
                          marginTop: 3,
                          marginRight: 18,
                        }}
                        color="success"
                      />
                    )
                  )}
                </>
              ) : (
                <div>Searching for an enemy...</div>
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
