import os
import sys
from dotenv import load_dotenv


sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from main import API_KEY
import json
import pandas as pd
from crime_abstract import PrinterBase, ReaderBase, ScraperBase
from icecream import ic
import googlemaps
from selenium import webdriver



class printerBase(PrinterBase):
    
        def dframe(self, this: pd.DataFrame) -> None:
            print('*'*100)
            ic(f'1. 타입은 {type(this)}')
            ic(f'2. 컬럼 {this.columns}')
            ic(f'3. 상위 5개 행\n{this.head()}')
            ic(f'4. null 의 갯수\n{this.isnull().sum()} 개')


class Editor(PrinterBase):

    def dropna(self, this: pd.DataFrame) -> pd.DataFrame:
        this = this.dropna()
        return this

class Reader(ReaderBase):

    def __init__(self) -> None:
        pass

    def csv(self, file) -> pd.DataFrame:
        return pd.read_csv(f'{file}.csv', encoding='utf-8', thousands=',')
    
    def excel(self, file, header, usecols) -> pd.DataFrame:
        return pd.read_excel(f'{file}.xls', header=header, usecols=usecols)
    
    def json(self, file) -> pd.DataFrame:
        return json.load(open(f'{file}.json', encoding='utf-8'))
    
    def gmaps(self) -> pd.DataFrame:
        return googlemaps.Client(key=API_KEY)
    

class Scraper(ScraperBase):

    def __init__(self) -> None:
        pass

    def driver(self):
        return webdriver.Chrome('C:/Program Files/Google/Chrome/chromedriver.exe')

    def auto_login(self, driver, url, selector, data) -> None:
        driver.get(url)
        driver.find_element_by_css_selector(selector).send_keys(data)
        driver.find_element_by_css_selector(selector).submit()

