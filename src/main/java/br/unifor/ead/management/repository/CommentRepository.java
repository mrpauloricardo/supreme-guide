package br.unifor.ead.management.repository;

import br.unifor.ead.management.entity.Comment;
import br.unifor.ead.management.entity.Subject;
import br.unifor.ead.management.entity.User;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findBySubject(Subject subject);
    List<Comment> findByCreator(User creator);
    List<Comment> findBySubjectAndCreator(Subject subject, User creator);
}

