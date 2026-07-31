from typing import Generic, TypeVar

from pydantic import BaseModel
from sqlalchemy.orm import Session

from backend.models.base import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    """CRUD operations shared by every SQLAlchemy-backed repository."""

    model: type[ModelType]

    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[ModelType]:
        return self.db.query(self.model).all()

    def get_by_id(self, id: int) -> ModelType | None:
        return self.db.query(self.model).filter(self.model.id == id).first()

    def get_by_field(self, field: str, value) -> ModelType | None:
        return self.db.query(self.model).filter(getattr(self.model, field) == value).first()

    def create(self, data: BaseModel) -> ModelType:
        instance = self.model(**data.model_dump())
        self.db.add(instance)
        self.db.commit()
        self.db.refresh(instance)
        return instance
