from typing import List
from strawberry import type as stbType, field, mutation, Schema


def get_author_for_book(root) -> "Author":
    return Author(name="Mil dna schema")


def get_release_date(root) -> int:
    return 1999


@stbType
class Book:
    title: str
    release_date: int = field(resolver=get_release_date)
    author: "Author" = field(resolver=get_author_for_book)


def get_book_for_author(root) -> List["Book"]:
    return [Book(title="Python tutorial for beginner")]


@stbType
class Author:
    name: str
    books: List["Book"] = field(resolver=get_book_for_author)


def get_books() -> List[Book]:
    return [Book(title="The Great Gatsby")]


def get_authors() -> List[Author]:
    return [Author(name="Michael Crichton")]


@stbType
class Query:
    books: List[Book] = field(resolver=get_books)
    authors: List[Author] = field(resolver=get_authors)


@stbType
class Mutation:
    @mutation
    def add_book(self, title: str, author: str) -> Book:
        return Book(title=title)


schema = Schema(query=Query, mutation=Mutation)
