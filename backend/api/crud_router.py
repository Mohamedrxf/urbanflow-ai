"""Factory for the list/detail/create routers shared by simple resources."""

from inspect import Parameter, Signature

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.config.database import get_db
from backend.repositories.base_repository import BaseRepository


def create_crud_router(
    *,
    prefix: str,
    tag: str,
    repository_type: type[BaseRepository],
    create_schema: type[BaseModel],
    response_schema: type[BaseModel],
    not_found_detail: str,
    lookup_field: str = "id",
    lookup_type: type = int,
) -> APIRouter:
    """Build a router exposing `GET /`, `GET /{lookup_field}` and `POST /`."""
    router = APIRouter(prefix=prefix, tags=[tag])

    @router.get("/", response_model=list[response_schema])
    def list_items(db: Session = Depends(get_db)):
        return repository_type(db).get_all()

    def get_item(**kwargs):
        db = kwargs["db"]
        item = repository_type(db).get_by_field(lookup_field, kwargs[lookup_field])
        if item is None:
            raise HTTPException(status_code=404, detail=not_found_detail)
        return item

    get_item.__signature__ = Signature(
        [
            Parameter(lookup_field, Parameter.KEYWORD_ONLY, annotation=lookup_type),
            Parameter("db", Parameter.KEYWORD_ONLY, default=Depends(get_db), annotation=Session),
        ]
    )
    router.get(f"/{{{lookup_field}}}", response_model=response_schema)(get_item)

    @router.post("/", response_model=response_schema)
    def create_item(item: create_schema, db: Session = Depends(get_db)):
        return repository_type(db).create(item)

    return router
