package br.unifor.ead.management.repository;

import br.unifor.ead.management.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment, String> {

}

