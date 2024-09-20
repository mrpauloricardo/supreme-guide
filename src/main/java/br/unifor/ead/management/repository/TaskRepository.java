package br.unifor.ead.management.repository;

import br.unifor.ead.management.entity.Subject;
import br.unifor.ead.management.entity.Task;
import br.unifor.ead.management.entity.User;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findBySubject(Subject subject);
    List<Task> findByCreator(User creator);
    List<Task> findBySubjectAndCreator(Subject subject, User creator);
}
