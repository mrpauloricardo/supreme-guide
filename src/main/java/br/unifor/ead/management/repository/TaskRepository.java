package br.unifor.ead.management.repository;

import br.unifor.ead.management.entity.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
}
