import hawksLogo from '../images/hawks-logo.png';
import celticsLogo from '../images/celtics-logo.png';
import netsLogo from '../images/nets-logo.png';
import hornetsLogo from '../images/hornets-logo.png';
import bullsLogo from '../images/bulls-logo.png';
import cavaliersLogo from '../images/cavs-logo.png';
import mavericksLogo from '../images/mavs-logo.png';
import nuggetsLogo from '../images/nuggets-logo.png';
import pistonsLogo from '../images/pistons-logo.png';
import warriorsLogo from '../images/warriors-logo.png';
import rocketsLogo from '../images/rockets-logo.png';
import pacersLogo from '../images/pacers-logo.png';
import clippersLogo from '../images/clippers-logo.png';
import lakersLogo from '../images/lakers-logo.png';
import grizzliesLogo from '../images/grizzlies-logo.png';
import heatLogo from '../images/heat-logo.gif';
import bucksLogo from '../images/bucks-logo.png';
import timberwolvesLogo from '../images/wolves-logo.png';
import pelicansLogo from '../images/pelicans-logo.png';
import knicksLogo from '../images/knicks-logo.png';
import thunderLogo from '../images/thunder-logo.png';
import magicLogo from '../images/magic-logo.png';
import sixersLogo from '../images/sixers-logo.png';
import sunsLogo from '../images/suns-logo.png';
import blazersLogo from '../images/blazers-logo.png';
import kingsLogo from '../images/kings-logo.png';
import spursLogo from '../images/spurs-logo.png';
import raptorsLogo from '../images/raptors-logo.png';
import jazzLogo from '../images/jazz-logo.gif';
import wizardsLogo from '../images/wizards-logo.png';


export const TeamLogos = [
    {
        "Name": "Atlanta Hawks",
        "Abbreviation": "ATL",
        "Logo": hawksLogo
    },
    {
        "Name": "Boston Celtics",
        "Abbreviation": "BOS",
        "Logo": celticsLogo
    }
    ,
    {
        "Name": "Brooklyn Nets",
        "Abbreviation": "BKN",
        "Logo": netsLogo
    }
    ,
    {
        "Name": "Charlotte Hornets",
        "Abbreviation": "CHA",
        "Logo": hornetsLogo
    }
    ,
    {
        "Name": "Chicago Bulls",
        "Abbreviation": "CHI",
        "Logo": bullsLogo
    }
    ,
    {
        "Name": "Cleveland Cavaliers",
        "Abbreviation": "CLE",
        "Logo": cavaliersLogo
    }
    ,
    {
        "Name": "Dallas Mavericks",
        "Abbreviation": "DAL",
        "Logo": mavericksLogo
    }
    ,
    {
        "Name": "Denver Nuggets",
        "Abbreviation": "DEN",
        "Logo": nuggetsLogo
    }
    ,
    {
        "Name": "Detroit Pistons",
        "Abbreviation": "DET",
        "Logo": pistonsLogo
    }
    ,
    {
        "Name": "Golden State Warriors",
        "Abbreviation": "GSW",
        "Logo": warriorsLogo
    }
    ,
    {
        "Name": "Houston Rockets",
        "Abbreviation": "HOU",
        "Logo": rocketsLogo
    }
    ,
    {
        "Name": "Indiana Pacers",
        "Abbreviation": "IND",
        "Logo": pacersLogo
    }
    ,
    {
        "Name": "Los Angeles Clippers",
        "Abbreviation": "LAC",
        "Logo": clippersLogo
    }
    ,
    {
        "Name": "Los Angeles Lakers",
        "Abbreviation": "LAL",
        "Logo": lakersLogo
    }
    ,
    {
        "Name": "Memphis Grizzlies",
        "Abbreviation": "MEM",
        "Logo": grizzliesLogo
    }
    ,
    {
        "Name": "Miami Heat",
        "Abbreviation": "MIA",
        "Logo": heatLogo
    }
    ,
    {
        "Name": "Milwaukee Bucks",
        "Abbreviation": "MIL",
        "Logo": bucksLogo
    }
    ,
    {
        "Name": "Minnesota Timberwolves",
        "Abbreviation": "MIN",
        "Logo": timberwolvesLogo
    }
    ,
    {
        "Name": "New Orleans Pelicans",
        "Abbreviation": "NOP",
        "Logo": pelicansLogo
    }
    ,
    {
        "Name": "New York Knicks",
        "Abbreviation": "NYK",
        "Logo": knicksLogo
    }
    ,
    {
        "Name": "Oklahoma City Thunder",
        "Abbreviation": "OKC",
        "Logo": thunderLogo
    }
    ,
    {
        "Name": "Orlando Magic",
        "Abbreviation": "ORL",
        "Logo": magicLogo
    }
    ,
    {
        "Name": "Philadelphia 76ers",
        "Abbreviation": "PHI",
        "Logo": sixersLogo
    }
    ,
    {
        "Name": "Phoenix Suns",
        "Abbreviation": "PHX",
        "Logo": sunsLogo
    }
    ,
    {
        "Name": "Portland Trail Blazers",
        "Abbreviation": "POR",
        "Logo": blazersLogo
    }
    ,
    {
        "Name": "Sacramento Kings",
        "Abbreviation": "SAC",
        "Logo": kingsLogo
    }
    ,
    {
        "Name": "San Antonio Spurs",
        "Abbreviation": "SAS",
        "Logo": spursLogo
    }
    ,
    {
        "Name": "Toronto Raptors",
        "Abbreviation": "TOR",
        "Logo": raptorsLogo
    }
    ,
    {
        "Name": "Utah Jazz",
        "Abbreviation": "UTA",
        "Logo": jazzLogo
    }   
    ,
    {
        "Name": "Washington Wizards",
        "Abbreviation": "WAS",
        "Logo": wizardsLogo
    }
]

export function getTeamLogo(teamAbbreviation) {
    for (let i = 0; i < TeamLogos.length; i++) {
        if (TeamLogos[i].Abbreviation == teamAbbreviation) {
            return TeamLogos[i].Logo;
        }
    }
}